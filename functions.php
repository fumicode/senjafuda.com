<?php

//管理画面について

add_editor_style('editor.css');

function custom_editor_settings( $initArray ){
      $initArray['body_class'] = 'articleContent';
          return $initArray;
}

add_filter( 'tiny_mce_before_init', 'custom_editor_settings' );
// サムネイルをサポート
add_theme_support( 'post-thumbnails');

