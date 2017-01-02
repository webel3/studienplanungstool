let SemesterHelper = {

    NOW_REFERENCE: 201602,
    FS: {
        value: '01',
        name: 'FS'
    },
    HS: {
        value: '02',
        name: 'HS'
    },

    split: function(semesterLabel) {
        let info = {
            year: parseInt(semesterLabel.toString().substr(0, 4)),
            type: semesterLabel.toString().substr(4) === this.FS.value ? this.FS : this.HS
        };

        // TODO: absolute semester-nr berechnen notwendig?
        return info;
    },

    add: function(semesterLabel, nr) {
        let info = this.split(semesterLabel);

        for (let i = 1; i <= nr; i++) {
            // only increment semester to autumn in case of spring
            if (info.type === this.FS) {
                info.type = this.HS;
            } else {
                // semester was in autumn, so increment the year and set semester to sprin
                info.type = this.FS;
                info.year++;
            }
        }

        return info;
    }

};

export default SemesterHelper;