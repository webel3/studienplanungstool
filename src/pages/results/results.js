import DynamicTable from '../../components/dynamic-table/dynamic-table';

let ResultsComponent = {
    template: require('./results.html'),
    data: () => {
        return {
            message: "results.js",
            headers: ['Name', 'Vorname'],
            rows: [
                ['Albert', 'Anthamatten'],
                ['Bernie', 'Brütsch'],
                ['Claude', 'Cawil'],
                ['Dani', 'Dorsch'],
                ['Esthi', 'Eschenbach'],
                ['Franz', 'Fisch'],
                ['Gustav', 'Gans'],
                ['Heidi', 'Hirsch'],
                ['Isabelle', 'Ischgl'],
                ['Karl', 'König'],
                ['Leo', 'Lachs'],
                ['Manfred', 'Meister']
            ]
        }
    },
    components: { DynamicTable }
};

export default ResultsComponent;