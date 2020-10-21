import React from "react"

const Display = (props) => {

    const { runners } = props;
    const loaded = () => (
        <div style={{ textAlign: "center" }}>
            {runners.map((runners) => (
                <article>
                    {/* <img src={shoes.img} /> */}
                    <h1>{runners.name}</h1>
                    <h3>{runners.runType}</h3>
                    <button onClick={() => {
                        props.selectRunners(runners)
                        props.history.push('/edit')
                    }}>Edit</button>
                    <button onClick={() => {
                        props.deleteRunners(runners)
                    }}>Delete</button>
                </article>
            ))}
        </div>
    );
    return <h1>TEST</h1>
};

export default Display;