import React from 'react';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

import { getDogs, getBreed, getDog } from '../../http/dogs';
import { getBreeds } from '../../http/breeds';

export default function Dogs() {
  const [data, setData] = React.useState([]);
  const [breeds, setBreeds] = React.useState([]);
  const [input, setInput] = React.useState();
  const [item, setItem] = React.useState();

  async function fetchAll() {
    const { data: dogs } = await getDogs(1);
    const { data: breeds } = await getBreeds();
    setBreeds(breeds);
    setData(dogs);
  }

  React.useEffect(() => {
    fetchAll();
  }, [])

  const itemRender = (current, type, element) => {
    if (type === 'page') {
      return <a href={`#${current}`}>{current}</a>;
    }
    return element;
  };

  function onChange(event) {
    setInput(event.target.value);
    setItem(event.target.value);
  }

  async function fetchDog() {
    if (input) {
      const { data: dog } = await getDog(input);
      setData([dog]);
    }
  }

  async function handleChange(event) {
    const { data } = await getBreed(event.target.value);
    setItem(event.target.value);
    setData(data);
  }

  const pagination = async (page) => {
    const { data: dogs } = await getDogs(page);
    setData(dogs);
  };

  return (
    <div>
      <div
        style={{ marginBottom: '20px' }}
      >
        <input onChange={onChange} />
        <button onClick={() => fetchDog()}>Get</button>
        <select
          name='select'
          onChange={handleChange}
        >
          <option />
          {breeds.map(e => {
            return (
              <option key={e._id} value={e._id}>{e.title}</option>
            )
          })}
        </select>
      </div>
      <table border='1' width='100%' margin-top='15px'>
        <tr>
          <th>Заголовок</th>
          <th>Картинка</th>
          <th>Порода</th>
        </tr>
        {data.map(e => {
          const [, , , , pomeranian] = e.image.split('/');
          return (
            <tr key={e.key}>
              <td>{e.title}</td>
              <td><img width='100' height='100' src={e.image} alt='dog' /></td>
              <td>{pomeranian}</td>
            </tr>
          )
        })}
      </table>
      <Pagination
        style={{
          marginBottom: '30px',
          marginTop: '20px',
          display: 'flex',
          listStyleType: 'none',
          justifyContent: 'space-around',
          cursor: 'pointer',
        }}
        total={!item ? breeds.length || 1 : data.length}
        itemRender={itemRender}
        onChange={pagination}
        showTotal={(total, range) =>
          `${range[0]} - ${range[1]} of ${total} items`
        }
      />
    </div>
  )
}
