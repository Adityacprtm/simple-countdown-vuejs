const BIRTHDAY_MONTH = 6; // June (1-based)
const BIRTHDAY_DAY = 21;
const JAKARTA_TZ = "Asia/Jakarta";

const MS_SEC = 1000;
const MS_MIN = MS_SEC * 60;
const MS_HOUR = MS_MIN * 60;
const MS_DAY = MS_HOUR * 24;

function nextBirthday() {
  const now = new Date();
  const candidate = new Date(now.getFullYear(), BIRTHDAY_MONTH - 1, BIRTHDAY_DAY);
  if (candidate <= now) candidate.setFullYear(candidate.getFullYear() + 1);
  return candidate;
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function yearProgressPercent(now) {
  const start = new Date(now.getFullYear(), 0, 1);
  const end = new Date(now.getFullYear() + 1, 0, 1);
  return ((now - start) / (end - start) * 100).toFixed(1);
}

const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      utcDate: "",
      myDate: "",
      yourDate: "",
      yearProgress: 0,
    };
  },

  computed: {
    target() {
      return nextBirthday();
    },
    targetDate() {
      return this.target.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    },
    targetWeekday() {
      return this.target.toLocaleDateString("en-US", { weekday: "long" });
    },
  },

  mounted() {
    this.tick();
    this._timer = setInterval(() => this.tick(), 1000);
  },

  beforeUnmount() {
    clearInterval(this._timer);
  },

  methods: {
    tick() {
      const now = new Date();
      const distance = this.target - now;

      this.days = String(Math.floor(distance / MS_DAY));
      this.hours = pad(Math.floor((distance % MS_DAY) / MS_HOUR));
      this.minutes = pad(Math.floor((distance % MS_HOUR) / MS_MIN));
      this.seconds = pad(Math.floor((distance % MS_MIN) / MS_SEC));

      this.yearProgress = yearProgressPercent(now);

      this.utcDate = now.toLocaleString("en-US", { timeZone: "Etc/UTC" });
      this.myDate = now.toLocaleString("en-US", { timeZone: JAKARTA_TZ });
      this.yourDate = now.toLocaleString();
    },
  },
});

app.mount("#app");
