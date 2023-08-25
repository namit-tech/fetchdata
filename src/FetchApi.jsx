import { useState } from 'react';
import "./fetchapi.css";
const App = () => {
    const [data, setData] = useState({ data: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');

    const handleClick = async () => {
        setIsLoading(true);

        try {
            const response = await fetch('https://reqres.in/api/users?', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            const result = await response.json();

            console.log('result is: ', JSON.stringify(result, null, 4));

            setData(result);
        } catch (err) {
            setErr(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    console.log(data);

    return (
        <div>
            <nav className="navbar  navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand text-warning" href="#">LetsGrowMore</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <button class="btn btn-outline-success" type="submit" onClick={handleClick}>Get Users</button>
                    </div>
                </div>
            </nav>
            {err && <h2>{err}</h2>}
            {isLoading && <h2>Loading...</h2>}

            {data.data.map(person => {
                return (


                    <>
                        <div className="user-cards">
                            <div className="User">
                                <img src={person.avatar} alt="" className="user-img" />
                                <div className="name">
                                    <h1 className='First-name'>{person.first_name}</h1>
                                    <h1 className='last-name'>{person.last_name}</h1>
                                </div>
                                <a href="#" className='email'>{person.email}</a>
                            </div>
                        </div>
                    </>
                );
            })}
        </div>
    );
};

export default App;