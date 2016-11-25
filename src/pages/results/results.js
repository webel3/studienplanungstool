import DynamicTable from '../../components/dynamic-table/dynamic-table';



let headerz = ['Name', 'Vorname'];
let rowz = [
    ['Albert', 'Anthamatten'],
    ['Bernie', 'Brütsch'],
    ['Claude', 'Cawil'],
    ['Dani', 'Dorsch'],
    ['Esthi', 'Eschenbach'],
    ['Franz', 'Fisch'],
    ['Gustav', 'Gans'],
    ['Heidi', 'Hirsch'],
    ['Isabelle', 'Ischgl']
];




let Results = {
    template: require('./results.html'),
    data: () => {
        return {
            message: "results.js",
            headers: [],
            rows: []
        }
    },

    created: function createdHook() {
        window.console.log("--------------- 'created' hook called.");
        this.headers = headerz;
        this.rows = rowz;
    },

    components: { DynamicTable }
};

export default Results;