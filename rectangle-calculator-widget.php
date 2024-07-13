<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

class Elementor_Rectangle_Calculator_Widget extends \Elementor\Widget_Base {

    public function get_name() {
        return 'rectangle_calculator';
    }

    public function get_title() {
        return __( 'Rectangle Calculator', 'rectangle-calculator-elementor' );
    }

    public function get_icon() {
        return 'eicon-calculator';
    }

    public function get_categories() {
        return [ 'general' ];
    }

    protected function _register_controls() {

        $this->start_controls_section(
            'content_section',
            [
                'label' => __( 'Content', 'rectangle-calculator-elementor' ),
                'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'width_label',
            [
                'label' => __( 'Width Label', 'rectangle-calculator-elementor' ),
                'type' => \Elementor\Controls_Manager::TEXT,
                'default' => __( 'Width (ft):', 'rectangle-calculator-elementor' ),
            ]
        );

        $this->add_control(
            'length_label',
            [
                'label' => __( 'Length Label', 'rectangle-calculator-elementor' ),
                'type' => \Elementor\Controls_Manager::TEXT,
                'default' => __( 'Length (ft):', 'rectangle-calculator-elementor' ),
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <div class="rectangle-calculator">
            <label for="width"><?php echo $settings['width_label']; ?></label>
            <input type="number" id="width" step="1">
            <br>
            <label for="length"><?php echo $settings['length_label']; ?></label>
            <input type="number" id="length" step="1">
            <br>
            <div id="output"></div>
            <canvas id="canvas"></canvas>
        </div>
        <?php
    }

    protected function _content_template() {
        ?>
        <#
        var width_label = settings.width_label;
        var length_label = settings.length_label;
        #>
        <div class="rectangle-calculator">
            <label for="width">{{{ width_label }}}</label>
            <input type="number" id="width" step="1">
            <br>
            <label for="length">{{{ length_label }}}</label>
            <input type="number" id="length" step="1">
            <br>
            <div id="output"></div>
            <canvas id="canvas"></canvas>
        </div>
        <?php
    }
}
