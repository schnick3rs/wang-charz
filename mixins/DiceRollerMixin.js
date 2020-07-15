export default {
  methods: {
    rollD66() {
      return (this.rollD6()*10) + this.rollD6();
    },
    rollD3(){
      return this.rollSingleDie(3);
    },
    rollD6(){
      return this.rollSingleDie(6);
    },
    rollSingleDie(sides) {
      return Math.floor(Math.random() * sides) + 1;
    },
  },
};
