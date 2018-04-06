<?php /*

 Composr
 Copyright (c) ocProducts, 2004-2016

 See text/EN/licence.txt for full licencing information.


 NOTE TO PROGRAMMERS:
   Do not edit this file. If you need to make changes, save your changed file to the appropriate *_custom folder
   **** If you ignore this advice, then your website upgrades (e.g. for bug fixes) will likely kill your changes ****

*/

/**
 * @license    http://opensource.org/licenses/cpal_1.0 Common Public Attribution License
 * @copyright  ocProducts Ltd
 * @package    newsletter
 */

require_code('resource_fs');

/**
 * Hook class.
 */
class Hook_commandr_fs_newsletter_subscribers extends Resource_fs_base
{
    public $file_resource_type = 'newsletter_subscriber';

    /**
     * Standard Commandr-fs function for seeing how many resources are. Useful for determining whether to do a full rebuild.
     *
     * @param  ID_TEXT $resource_type The resource type
     * @return integer How many resources there are
     */
    public function get_resources_count($resource_type)
    {
        return $GLOBALS['SITE_DB']->query_select_value('newsletter_subscribers', 'COUNT(*)');
    }

    /**
     * Standard Commandr-fs function for searching for a resource by label.
     *
     * @param  ID_TEXT $resource_type The resource type
     * @param  LONG_TEXT $label The resource label
     * @return array A list of resource IDs
     */
    public function find_resource_by_label($resource_type, $label)
    {
        $_ret = $GLOBALS['SITE_DB']->query_select('newsletter_subscribers', array('id'), array('email' => $label));
        $ret = array();
        foreach ($_ret as $r) {
            $ret[] = strval($r['id']);
        }
        return $ret;
    }

    /**
     * Standard Commandr-fs date fetch function for resource-fs hooks. Defined when getting an edit date is not easy.
     *
     * @param  array $row Resource row (not full, but does contain the ID)
     * @return ?TIME The edit date or add date, whichever is higher (null: could not find one)
     */
    protected function _get_file_edit_date($row)
    {
        //return $GLOBALS['SITE_DB']->query_select_value_if_there('newsletter_subscribers', 'MAX(join_time)');
        return null; // The above can't handle unsubscribes
    }

    /**
     * Standard Commandr-fs add function for resource-fs hooks. Adds some resource with the given label and properties.
     *
     * @param  LONG_TEXT $filename Filename OR Resource label
     * @param  string $path The path (blank: root / not applicable)
     * @param  array $properties Properties (may be empty, properties given are open to interpretation by the hook but generally correspond to database fields)
     * @return ~ID_TEXT The resource ID (false: error, could not create via these properties / here)
     */
    public function file_add($filename, $path, $properties)
    {
        list($properties, $label) = $this->_file_magic_filter($filename, $path, $properties, $this->file_resource_type);

        require_code('newsletter');

        $email = $label;
        $join_time = $this->_default_property_time($properties, 'join_time');
        $code_confirm = $this->_default_property_int_null($properties, 'code_confirm');
        if (is_null($code_confirm)) {
            $code_confirm = 0;
        }
        $password = $this->_default_property_str($properties, 'password');
        $salt = $this->_default_property_str($properties, 'salt');
        $language = $this->_default_property_str($properties, 'language');
        if ($language == '') {
            $language = get_site_default_lang();
        }
        $forename = $this->_default_property_str($properties, 'forename');
        $surname = $this->_default_property_str($properties, 'surname');

        $id = add_newsletter_subscriber($email, $join_time, $code_confirm, $password, $salt, $language, $forename, $surname);

        $this->_resource_save_extend($this->file_resource_type, strval($id), $filename, $label, $properties);

        return strval($id);
    }

    /**
     * Standard Commandr-fs load function for resource-fs hooks. Finds the properties for some resource.
     *
     * @param  SHORT_TEXT $filename Filename
     * @param  string $path The path (blank: root / not applicable). It may be a wildcarded path, as the path is used for content-type identification only. Filenames are globally unique across a hook; you can calculate the path using ->search.
     * @return ~array Details of the resource (false: error)
     */
    public function file_load($filename, $path)
    {
        list($resource_type, $resource_id) = $this->file_convert_filename_to_id($filename);

        $rows = $GLOBALS['SITE_DB']->query_select('newsletter_subscribers', array('*'), array('id' => intval($resource_id)), '', 1);
        if (!array_key_exists(0, $rows)) {
            return false;
        }
        $row = $rows[0];

        $properties = array(
            'label' => $row['email'],
            'join_time' => $row['join_time'],
            'code_confirm' => $row['code_confirm'],
            'password' => $row['the_password'],
            'salt' => $row['pass_salt'],
            'language' => $row['language'],
            'forename' => $row['n_forename'],
            'surname' => $row['n_surname'],
        );
        $this->_resource_load_extend($resource_type, $resource_id, $properties, $filename, $path);
        return $properties;
    }

    /**
     * Standard Commandr-fs edit function for resource-fs hooks. Edits the resource to the given properties.
     *
     * @param  ID_TEXT $filename The filename
     * @param  string $path The path (blank: root / not applicable)
     * @param  array $properties Properties (may be empty, properties given are open to interpretation by the hook but generally correspond to database fields)
     * @return ~ID_TEXT The resource ID (false: error, could not create via these properties / here)
     */
    public function file_edit($filename, $path, $properties)
    {
        list($resource_type, $resource_id) = $this->file_convert_filename_to_id($filename);
        list($properties,) = $this->_file_magic_filter($filename, $path, $properties, $this->file_resource_type);

        require_code('newsletter');

        $email = $this->_default_property_str($properties, 'label');
        $join_time = $this->_default_property_time($properties, 'join_time');
        $code_confirm = $this->_default_property_int_null($properties, 'code_confirm');
        if (is_null($code_confirm)) {
            $code_confirm = 0;
        }
        $password = $this->_default_property_str($properties, 'password');
        $salt = $this->_default_property_str($properties, 'salt');
        $language = $this->_default_property_str($properties, 'language');
        if ($language == '') {
            $language = get_site_default_lang();
        }
        $forename = $this->_default_property_str($properties, 'forename');
        $surname = $this->_default_property_str($properties, 'surname');

        edit_newsletter_subscriber(intval($resource_id), $email, $join_time, $code_confirm, $password, $salt, $language, $forename, $surname);

        $this->_resource_save_extend($this->file_resource_type, $resource_id, $filename, $email, $properties);

        return $resource_id;
    }

    /**
     * Standard Commandr-fs delete function for resource-fs hooks. Deletes the resource.
     *
     * @param  ID_TEXT $filename The filename
     * @param  string $path The path (blank: root / not applicable)
     * @return boolean Success status
     */
    public function file_delete($filename, $path)
    {
        list($resource_type, $resource_id) = $this->file_convert_filename_to_id($filename);

        require_code('newsletter');

        delete_newsletter_subscriber(intval($resource_id));

        return true;
    }
}
