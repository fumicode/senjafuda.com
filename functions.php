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

//デフォルトのサムネイルの大きさ
set_post_thumbnail_size( 400, 300, array('center','center'));
//正方形ででかく
add_image_size( 'thumbnail4x4', 400, 400, true );
add_image_size( 'slider', 1080, 610, true );

//html のwidth やheightを削除する
add_filter( 'post_thumbnail_html', 'custom_attribute' );
function custom_attribute( $html ){
  // width height を削除する
  $html = preg_replace('/(width|height)="\d*"\s/', '', $html);
  return $html;
}

//抜粋をサポート
add_post_type_support( 'page', 'excerpt' );