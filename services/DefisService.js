import AsyncStorage from "@react-native-community/async-storage";

class defisService {
  allowedDefisTimes = [];
  restTimes = {};
  defisNumber = null;
  /* restTimes = {
    restTimeStart1: null,
    restTimeEnd1: null,
    restTimeStart2: null,
    restTimeEnd2: null
  };
 */
  constructor() {
    this.restrieveRestTimes();
    console.log("constructor defisService", this.restTimes);
  }

  setDefisNumber = number => {
    this.defisNumber = number;
    this.storeDefisNumber();
  };

  storeDefisNumber = async () => {
    try {
      const defisNumberToStore = JSON.stringify(this.defisNumber);
      console.log("defis number about to be stored:", defisNumberToStore);
      await AsyncStorage.setItem("@defisNumber", defisNumberToStore);
    } catch (error) {
      console.log("Error saving allowed defis times" + error);
    }
  };

  retrieveDefisNumber = async () => {
    try {
      const storedDefisNumber = await AsyncStorage.getItem("@defisNumber");
      let retrievedDefisNumber = JSON.parse(storedDefisNumber);
      if (!retrievedDefisNumber) {
        retrievedDefisNumber = 2;
      }
      this.defisNumber = retrievedDefisNumber;
      console.log("retrieved defis number:", this.defisNumber);
      return retrievedDefisNumber;
    } catch (error) {
      console.log("Error retrieving defis number" + error);
    }
  };

  getDefisNumber = () => {
    return this.defisNumber;
  };

  setAllowedDefisTimes = (
    restTimeStart1,
    restTimeEnd1,
    restTimeStart2,
    restTimeEnd2
  ) => {
    let defisPeriods = Array(24).fill(1);
    defisPeriods = this.computeDefisPeriods(
      defisPeriods,
      restTimeStart1,
      restTimeEnd1
    );
    console.log("periods after first times taken into account", defisPeriods);
    defisPeriods = this.computeDefisPeriods(
      defisPeriods,
      restTimeStart2,
      restTimeEnd2
    );
    console.log("periods after second times taken into account", defisPeriods);
    defisPeriods.forEach((t, ind) => {
      if (t == 1) {
        this.allowedDefisTimes.push(ind);
      }
    });
    console.log("allowed defis times", this.allowedDefisTimes);
  };

  computeDefisPeriods = (defisPeriods, start, end) => {
    let dP = [...defisPeriods];
    if (start <= end) {
      for (i = start; i < end; i++) {
        dP[i] = 0;
      }
    } else {
      for (i = 0; i < end; i++) {
        dP[i] = 0;
      }
      for (i = start; i < defisPeriods.length; i++) {
        dP[i] = 0;
      }
    }
    return dP;
  };

  getAllowedDefisTimes = () => {
    return this.allowedDefisTimes;
  };

  checkAllowedDefisTimes = () => {
    if (this.allowedDefisTimes.length == 0) {
      return false;
    } else {
      return true;
    }
  };

  storeAllowedDefisTimes = async () => {
    try {
      const allowedDefisTimesToStore = JSON.stringify(this.allowedDefisTimes);
      console.log(
        "allowed defis times about to be stored:",
        allowedDefisTimesToStore
      );
      await AsyncStorage.setItem(
        "@allowedDefisTimes",
        allowedDefisTimesToStore
      );
    } catch (error) {
      console.log("Error saving allowed defis times" + error);
    }
  };

  retrieveAllowedDefisTimes = async () => {
    try {
      const storedAllowedDefisTimes = await AsyncStorage.getItem(
        "@allowedDefisTimes"
      );
      let retrievedAllowedDefisTimes = JSON.parse(storedAllowedDefisTimes);
      if (!retrievedAllowedDefisTimes) {
        retrievedAllowedDefisTimes = [];
      } else {
        console.log(
          "retrieved allowed defis times:",
          retrievedAllowedDefisTimes
        );
      }
    } catch (error) {
      console.log("Error retrieving notes" + error);
    }
  };

  setRestTimes = (
    restTimeStart1,
    restTimeEnd1,
    restTimeStart2,
    restTimeEnd2
  ) => {
    this.restTimes = {
      restTimeStart1: restTimeStart1,
      restTimeEnd1: restTimeEnd1,
      restTimeStart2: restTimeStart2,
      restTimeEnd2: restTimeEnd2
    };
    this.storeRestTimes();
  };

  storeRestTimes = async () => {
    try {
      const restTimesToStore = JSON.stringify(this.restTimes);
      console.log("rest times about to be stored:", restTimesToStore);
      await AsyncStorage.setItem("@restTimes", restTimesToStore);
    } catch (error) {
      console.log("Error saving rest times" + error);
    }
  };

  restrieveRestTimes = async () => {
    try {
      const storedRestTimes = await AsyncStorage.getItem("@restTimes");
      let retrievedRestTimes = JSON.parse(storedRestTimes);
      if (!retrievedRestTimes) {
        retrievedRestTimes = {
          restTimeStart1: 22,
          restTimeEnd1: 8,
          restTimeStart2: 12,
          restTimeEnd2: 14
        };
      }
      this.restTimes = retrievedRestTimes;
      console.log("retrieved rest times:", this.restTimes);
      //return retrievedRestTimes;
    } catch (error) {
      console.log("Error retrieving notes" + error);
    }
  };

  restrieveRestTimesAsync = async () => {
    try {
      const storedRestTimes = await AsyncStorage.getItem("@restTimes");
      let retrievedRestTimes = JSON.parse(storedRestTimes);
      if (!retrievedRestTimes) {
        retrievedRestTimes = {
          restTimeStart1: 22,
          restTimeEnd1: 8,
          restTimeStart2: 12,
          restTimeEnd2: 14
        };
      }
      this.restTimes = retrievedRestTimes;
      console.log("retrieved rest times:", this.restTimes);
      return retrievedRestTimes;
    } catch (error) {
      console.log("Error retrieving notes" + error);
    }
  };

  getRestTimes = () => {
    return this.restTimes;
  };

  generateDefisScheduleTime = day => {
    // day: integer (0: today, 1: tomorow, etc)
    const dayms = 86400000;
    let date = null;
    let hour = this.allowedDefisTimes[
      Math.floor(Math.random() * this.allowedDefisTimes.length)
    ];
    let minute = Math.floor(Math.random() * 60);
    let d = new Date();
    let now = d.getTime();
    if (day == 0) {
      d.setHours(hour, minute, 0, 0);
      if (d.getTime() > now) {
        date = d;
      }
    } else {
      d = new Date(now + day * dayms);
      d.setHours(hour, minute, 0, 0);
      date = d;
    }
    return date;
  };

  getRandomDefi = () => {
    let defi = defisConst[Math.floor(Math.random() * defisConst.length)];
    return defi;
  };

  scheduleDefis = notifFn => {
    console.log("scheduling defis...");
    let numDays = 1;
    for (i = 0; i < numDays; i++) {
      for (j = 0; j < this.defisNumber; j++) {
        let date = this.generateDefisScheduleTime(i);
        let defi = this.getRandomDefi();
        //console.log("returned by generateSchedule & defis:", date, defi);
        if (date) {
          //notifFn(" ", new Date(date.getTime()));
          notifFn(defi.text);
          console.log("defi:", defi.text, ", will be scheduled at:", date);
        }
      }
    }
  };
}

export default defisService;

const defisConst = [
  {
    text: "quels moments de ma journée je peux remercier?",
    time: 0,
    type: "Merci"
  },
  {
    text:
      "prends quelques minutes pour identifier la dernière bonne chose qui t'est arrivée et murmure un remerciement",
    time: 0,
    type: "Merci"
  },
  {
    text:
      "avant de t'endormir, remonte ta journée en esprit et murmure tes remerciements pour les petits bonheurs que tu as vécus",
    time: 0,
    type: "Merci"
  },

  {
    text: "avant de manger, remercie pour ce que tu vas manger",
    time: 0,
    type: "Merci"
  },
  {
    text:
      "fais le point sur le temps écoulé de ta journée. Quelles sont les choses bonnes pour lesquelles tu pourrais remercier ?",
    time: 0,
    type: "Merci"
  },
  {
    text:
      "prends un temps d'arrêt de quelques minutes et cherche une ou deux raisons de remercier pour ton travail ou tes études",
    time: 0,
    type: "Merci"
  },
  {
    text:
      "prends un temps d'arrêt de quelques minutes et cherche une ou deux raisons de remercier pour ta vie avec tes amis",
    time: 0,
    type: "Merci"
  },
  {
    text:
      "prends un temps d'arrêt et cherche une ou deux raisons de remercier tes parents",
    time: 0,
    type: "Merci"
  },
  {
    text:
      "prends quelques minutes de marche puis remercie pour la beauté que tu contemples",
    time: 0,
    type: "Merci"
  },
  {
    text:
      "avant ton prochain repas, remercie pour la présence de quelqu’un à ta table",
    time: 0,
    type: "Merci"
  }
];
