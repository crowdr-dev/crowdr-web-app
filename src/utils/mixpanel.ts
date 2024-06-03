import mixpanel, { Dict } from "mixpanel-browser";

mixpanel.init("09420737b2f3103957800fa617fe2a0b", {
  debug: true,
  /* eslint-disable camelcase */
  track_pageview: true,
  persistence: "localStorage",
  ignore_dnt: true
});

const actions = {
  identify: (id: string) => {
    mixpanel.identify(id);
  },
  alias: (id: string) => {
    mixpanel.alias(id);
  },
  track: (name: string, props?: Dict) => {
    mixpanel.track(name, props);
  },
  people: {
    set: (props: Dict) => {
      mixpanel.people.set(props);
    }
  }
};

export let Mixpanel = actions;
