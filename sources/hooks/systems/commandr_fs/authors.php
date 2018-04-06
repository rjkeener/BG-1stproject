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
 * @package    authors
 */

require_code('resource_fs');

/**
 * Hook class.
 */
class Hook_commandr_fs_authors extends Resource_fs_base
{
    public $file_resource_type = 'author';

    /**
     * Standard Commandr-fs function for seeing how many resources are. Useful for determining whether to do a full rebuild.
     *
     * @param  ID_TEXT $resource_type The resource type
     * @return integer How many resources there are
     */
    public function get_resources_count($resource_type)
    {
        return $GLOBALS['SITE_DB']->query_select_value('authors', 'COUNT(*)');
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
        $ret = $GLOBALS['SITE_DB']->query_select('authors', array('author'), array('author' => $label));
        return collapse_1d_complexity('author', $ret);
    }

    /**
     * Standard Commandr-fs date fetch function for resource-fs hooks. Defined when getting an edit date is not easy.
     *
     * @param  array $row Resource row (not full, but does contain the ID)
     * @return ?TIME The edit date or add date, whichever is higher (null: could not find one)
     */
    protected function _get_file_edit_date($row)
    {
        $query = 'SELECT MAX(date_and_time) FROM ' . get_table_prefix() . 'actionlogs WHERE ' . db_string_equal_to('param_a', $row['author']) . ' AND  (' . db_string_equal_to('the_type', 'DEFINE_AUTHOR') . ')';
        return $GLOBALS['SITE_DB']->query_value_if_there($query);
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

        require_code('authors');

        $url = $this->_default_property_str($properties, 'url');
        $member_id = $this->_default_property_member_null($properties, 'member_id');
        $description = $this->_default_property_str($properties, 'description');
        $skills = $this->_default_property_str($properties, 'skills');
        $meta_keywords = $this->_default_property_str($properties, 'meta_keywords');
        $meta_description = $this->_default_property_str($properties, 'meta_description');

        add_author($label, $url, $member_id, $description, $skills, $meta_keywords, $meta_description);

        $this->_resource_save_extend($this->file_resource_type, $label, $filename, $label, $properties);

        return $label;
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

        $rows = $GLOBALS['SITE_DB']->query_select('authors', array('*'), array('author' => $resource_id), '', 1);
        if (!array_key_exists(0, $rows)) {
            return false;
        }
        $row = $rows[0];

        list($meta_keywords, $meta_description) = seo_meta_get_for('authors', $row['author']);

        $properties = array(
            'label' => $row['author'],
            'url' => $row['url'],
            'member_id' => remap_resource_id_as_portable('member', $row['member_id']),
            'description' => $row['description'],
            'skills' => $row['skills'],
            'meta_keywords' => $meta_keywords,
            'meta_description' => $meta_description,
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

        require_code('authors');

        $label = $this->_default_property_str($properties, 'label');
        $url = $this->_default_property_str($properties, 'url');
        $member_id = $this->_default_property_member_null($properties, 'member_id');
        $description = $this->_default_property_str($properties, 'description');
        $skills = $this->_default_property_str($properties, 'skills');
        $meta_keywords = $this->_default_property_str($properties, 'meta_keywords');
        $meta_description = $this->_default_property_str($properties, 'meta_description');

        // Author editing works via re-adding
        if ($label != $resource_id) {
            delete_author($resource_id); // Delete old one if we renamed
        }
        add_author($label, $url, $member_id, $description, $skills, $meta_keywords, $meta_description);

        $this->_resource_save_extend($this->file_resource_type, $resource_id, $filename, $label, $properties);

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

        require_code('authors');
        delete_author($resource_id);

        return true;
    }
}
