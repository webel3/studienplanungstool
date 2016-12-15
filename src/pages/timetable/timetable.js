import jQuery from 'jquery';

let Timetable = {
    template: require('./timetable.html'),
    data: () => {
        return {
            message: "timetable.js"
        }
    },

    mounted: function mounted() {
        // ensure that DOM element exists prior to use jquery
        this.$nextTick(function() {
            // some fancy jquery stuff
            window.console.log("'created' hook called. jQuery version: ", jQuery.fn.jquery);
        });
    }
};

export default Timetable;
