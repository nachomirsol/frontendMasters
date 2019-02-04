const filterCity = people.filter(item => item.city === "Valencia");

const people = [
  { name: "nacho", city: "Valencia" },
  { name: "Jaime", city: "Madrid" },
  { name: "David", city: "Barcelona" },
  { name: "Gabi", city: "Valencia" }
];

const howFilterWorks = (list, fn) => {
  const result = [];
  for (let i = 0; i < list.length; i++) {
    if (fn(list[i])) {
      result.push(list[i]);
    }
  }
  return result;
};
