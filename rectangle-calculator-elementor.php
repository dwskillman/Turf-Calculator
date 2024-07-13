<?php
/**
 * Plugin Name: Rectangle Calculator for Elementor
 * Description: Adds a rectangle calculator with waste section display for Elementor.
 * Version: 1.0
 * Author: Your Name
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

// Register the custom widget for Elementor
function register_rectangle_calculator_widget( $widgets_manager ) {
    require_once( __DIR__ . '/widgets/rectangle-calculator-widget.php' );
    $widgets_manager->register( new \Elementor_Rectangle_Calculator_Widget() );
}
add_action( 'elementor/widgets/register', 'register_rectangle_calculator_widget' );

// Enqueue the necessary scripts and styles
function enqueue_rectangle_calculator_scripts() {
    wp_enqueue_script( 'rectangle-calculator', plugins_url( '/js/rectangle-calculator.js', __FILE__ ), array( 'jquery' ), '1.0', true );
    wp_enqueue_style( 'rectangle-calculator', plugins_url( '/css/rectangle-calculator.css', __FILE__ ) );
}
add_action( 'wp_enqueue_scripts', 'enqueue_rectangle_calculator_scripts' );
