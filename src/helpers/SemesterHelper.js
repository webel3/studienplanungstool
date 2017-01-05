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

  label: function(info) {
    info.label = parseInt([info.year, info.type.value].join(''));
    return info;
  },

  split: function (semesterLabel) {
    let info = {
      year: parseInt(semesterLabel.toString().substr(0, 4)),
      type: semesterLabel.toString().substr(4) === this.FS.value ? this.FS : this.HS
    };
    return this.label(info);
  },

  // step: function(semesterLabel, semesterSteps) {
  //   let info = this.split(semesterLabel);
  //
  //   // in case of an odd step number, change the semester.
  //   if (semesterSteps % 2 === 1) {
  //     info.type = this.FS ? this.HS : this.FS;
  //   }
  //
  //   // add (or in case of negativity: subtract) half the amount of the steps, rounded down.
  //   info.year += Math.floor(semesterSteps / 2);
  //   return info;
  // },

  add: function (semesterLabel, nr) {
    let info = this.split(semesterLabel);

    for (let i = 1; i <= nr; i++) {
      // only increment semester to autumn in case of spring.
      if (info.type === this.FS) {
        info.type = this.HS;
      } else {
        // semester was in autumn, so increment the year and set semester to spring.
        info.type = this.FS;
        info.year++;
      }
    }
    return this.label(info);
  },

  subtract: function (semesterLabel, nr) {
    let info = this.split(semesterLabel);

    for (let i = nr; i >= 0; i--) {
      // only decrement semester to spring if it was autumn.
      if (info.type === this.HS) {
        info.type = this.FS;
      } else {
        // semester was spring, so go one year back and set semester to autumn.
        info.type = this.HS;
        info.year--;
      }
    }
    return this.label(info);
  },

  formatLabel: function(semesterLabel) {
    let info = this.split(semesterLabel);
    return [info.type.name, info.year].join(' ');
  }

};

export default SemesterHelper;