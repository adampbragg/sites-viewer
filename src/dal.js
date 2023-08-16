import axios from 'axios';
import dateformat from 'dateformat';
import { nanoid } from 'nanoid';

export const getSites = async () => {
  const response = await axios.get('http://localhost:3001/sites');
  const sites = response.data;
  for (let site in sites) {
    const samples = sites[site].days;
    samples.map((sample) => {
      const splitDate = sample.date.split('-');
      sample.dateDisplay = dateformat(new Date(splitDate[0], splitDate[1] - 1, splitDate[2]), 'm-d');
      sample.weightDisplay = Math.floor(sample.weight);
      sample.key = nanoid();
      sample.reliable = sample.samples >= 50;
      return sample;
    })
    // if the next date is not present, then add an empty record
    let sampleCount = samples.length;
    let i = 0;
    while (i < sampleCount) {
      const sample = samples[i];
      const nextSample = samples[i + 1];
      if (nextSample) {
        const splitDay = parseInt(sample.date.split('-')[2]);
        const nextSplitDay = parseInt(nextSample.date.split('-')[2]);
        let nextDateDiff = nextSplitDay - splitDay;
        if (nextDateDiff > 1) {
          const newI = i + nextDateDiff + 1; //4
          let fillers = [];
          fillers.length = nextDateDiff - 1;
          fillers.fill({}, 0, nextDateDiff - 1);
          fillers = fillers.map(fill => ({ key: nanoid() }));
          samples.splice(i + 1, 0, ...fillers);
          i = newI;
        } else {
          i++;
        }
      } else {
        i++;
      }
    }
  }

  return response.data;
}