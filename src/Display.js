import React from "react"

const Display = (props) => {

    const { shoes } = props;
    const loaded = () => (
        <div style={{ textAlign: "center" }}>
            {shoes.map((shoes) => (
                <article>
                    <img src={shoes.img} />
                    <h1>{shoes.name}</h1>
                    <h3>{shoes.runType}</h3>
                    <button onClick={() => {
                        props.selectShoes(shoes)
                        props.history.push('/edit')
                    }}>Edit</button>
                    <button onClick={() => {
                        props.deleteShoes(shoes)
                    }}>Delete</button>
                </article>
            ))}
        </div>
    );
    return shoes.length > 0 ? loaded() : <h1>Loading...</h1>;
};

export default Display;