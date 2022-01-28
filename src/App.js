import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);

  const [catName, setCatName] = useState("");
  const [catAge, setCatAge] = useState("");
  const [breed, setBreed] = useState("");
  const [image, setImage] = useState("");

  const [name, setName] = useState("");

  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [singleCat, setSingleCat] = useState(null);
  const [byAge, setByAge] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get("http://localhost:3000/cats");
        console.log(data.data);
        setPosts(data.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);
  const add = async (e) => {
    e.preventDefault();
    const data = await axios.post("http://localhost:3000/cats", {
      age: catAge,
      name: catName,
      breed,
      image,
    });
  };

  const deletePost = async (item) => {
    try {
      const data = await axios.delete(`http://localhost:3000/cats/${item._id}`);
    } catch (err) {
      alert(`cat with given ${item._id} ${err.response.data}`);
    }
  };

  const findByName = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.get(`http://localhost:3000/cats/${name}`);
      setSingleCat(data.data);
    } catch (err) {
      // console.log(err.response)
      // console.log(err.response.data.message);
      alert(`cat with given name ${err.response.data.message}`);
    }
  };

  const findByMinMax = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.get(
        `http://localhost:3000/cats/search?age_lte=${+min}&age_gte=${+max}`
      );
      console.log(data);
      setByAge(data.data);
    } catch (err) {
      // console.log(err.response);
      alert(
        `cat with given age in between ${min} -${max} ${err.response.data.message}`
      );
    }
  };
  // console.log(posts);
  return (
    <div className="App">
      <h1
        style={{
          textAlign: "center",
        }}>
        Create New Cat
      </h1>
      <form>
        <div>
          <input
            type="text"
            placeholder="cat name"
            value={catName}
            onChange={(e) => setCatName(e.target.value)}
          />
          <input
            type="text"
            placeholder="cat age"
            value={catAge}
            onChange={(e) => setCatAge(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="cat breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
          <input
            type="text"
            placeholder="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <br />
        <button onClick={add}>Add</button>
      </form>
      <hr />
      <form onSubmit={findByName}>
        <h3>find by name</h3>
        <input
          type="text"
          placeholder="find by name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>

      {singleCat && (
        <div className="single">
          <h4>
            {singleCat.name} {singleCat.age}
          </h4>
          <div>
            <img src={singleCat.image} height="200" width="200" alt="" />
          </div>
        </div>
      )}
      <hr />

      <form onSubmit={findByMinMax}>
        <h3>find by cat by age in between</h3>
        <div>
          <input
            type="text"
            placeholder="min age(not included)"
            value={min}
            onChange={(e) => setMin(e.target.value)}
          />
          <input
            type="text"
            placeholder="max age(not included)"
            value={max}
            onChange={(e) => setMax(e.target.value)}
          />
        </div>
        <button>Search</button>
      </form>

      <div className="multiple">
        {byAge?.map((byAge) => (
          <div key={byAge._id}>
            <div>
              <h4>
                {byAge.name} {byAge.age}
              </h4>
            </div>
            <div>
              <img src={byAge.Image} height="200" width="200" alt="" />
            </div>
          </div>
        ))}
      </div>

      <hr />
      <h1>All cats</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}>
        {posts?.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid lightgray",
              margin: "5px",
              padding: "5px",
            }}>
            <div>
              <h4>
                {item.name}-{item.age}-{item.breed}
              </h4>
            </div>
            <div>
              <div>
                <img src={item.image} width="200" height="200" alt="" />
              </div>
              <hr />
              <button onClick={() => deletePost(item)}>delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
