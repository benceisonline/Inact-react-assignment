import React from "react";
import Chart from 'chart.js/auto'; // Have to import to make chartjs-2 work, not pretty for linting but quick fix
import { Bar } from "react-chartjs-2";
import './App.css';

/* Family tree for Henning */
const lars = { Name: "Lars", Age: 20, ShoeSize: 46, Gender: "M", Children: [] };
const iben = { Name: "Iben", Age: 26, ShoeSize: 38, Gender: "F", Children: [] };
const bente = {
  Name: "Bente",
  Age: 46,
  ShoeSize: 37,
  Gender: "F",
  Children: [lars]
};
const viggo = {
  Name: "Viggo",
  Age: 47,
  ShoeSize: 42,
  Gender: "M",
  Children: [iben]
};
const henning = {
  Name: "Henning",
  Age: 65,
  ShoeSize: 44,
  Gender: "M",
  Children: [viggo, bente]
};

/* Data for bar chart, not the prettiest solution but made my life easier */
const familyAges = [henning.Age, viggo.Age, bente.Age, iben.Age, lars.Age];
const labels = ["Henning", "Viggo", "Bente", "Iben", "Lars"];

/* Gender mapping */
const GENDER_MAPPING = {
  M: "Male",
  F: "Female",
};

/* Solution to assignment 1 */
class FamilyTree extends React.Component {
  render() {

    /* FamilyTree takes person property for root of the tree */
    const { person } = this.props;

    /* Renders children recursively */
    return (
      <div className="family-tree">
        <div className="person-info">
          <strong>{person.Name}</strong>
          <span className="info-details">
            (Age: {person.Age}, Shoe Size: {person.ShoeSize}, Gender: {GENDER_MAPPING[person.Gender]})
          </span>
        </div>

        {person.Children.length > 0 && (
          <ul className="children-list">
            {person.Children.map((child, index) => (
              <li key={index} className="child-item">
                <FamilyTree person={child} />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

/* Solution to assignment 2 */
class BarChart extends React.Component {
  render() {

    /* BarChart takes familyAges and labels as properties */
    const { familyAges, labels } = this.props;

    const data = {
      labels,
      datasets: [
        {
          label: "Age",
          data: familyAges,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1,
        },
      ],
    };

    return <Bar data={data} />;
  }
}

/* Solution to assignment 3 */
class GenderAverage extends React.Component {
  calculateAverageShoeSize(person) {
    const genderShoeSizes = {
      Male: [],
      Female: [],
    };

    /* Traverses the family tree and collects shoe sizes */
    const traverseFamily = (member) => {
      const gender = GENDER_MAPPING[member.Gender];
      genderShoeSizes[gender].push(member.ShoeSize);

      member.Children.forEach((child) => {
        traverseFamily(child);
      });
    };

    traverseFamily(person);

    const calculateAverage = (gender) =>
      genderShoeSizes[gender].reduce((acc, size) => acc + size, 0) / genderShoeSizes[gender].length;

    const averageShoeSizeMale = calculateAverage("Male");
    const averageShoeSizeFemale = calculateAverage("Female");

    return {
      averageShoeSizeMale,
      averageShoeSizeFemale,
    };
  }

  render() {
    const { person } = this.props;
    const { averageShoeSizeMale, averageShoeSizeFemale } = this.calculateAverageShoeSize(person);

    return (
      <div>
        <p>Average shoe size per gender:</p>
        <p>👟 Male: {averageShoeSizeMale.toFixed(2)}</p>
        <p>👟 Female: {averageShoeSizeFemale.toFixed(2)}</p>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1 className="title">Inact Assignment</h1>
        <ol>
          <li>
            Write some code to show and navigate the family tree of Henning
            <p>
              <FamilyTree person={henning} />
            </p>
          </li>
          <li>Visualize the ages of the family in a bar chart</li>
          <p>
            <BarChart familyAges={familyAges} labels={labels} />
          </p>
          <li>Calculate and show the average shoe size per gender</li>
          <p>
            <GenderAverage person={henning} />
          </p>
        </ol>
      </div>
    );
  }
}

export default App;