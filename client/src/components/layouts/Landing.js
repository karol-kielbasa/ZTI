import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">Hello</h1>
                    <div className='buttons'>
                        <Link to="/login" className='btn btn-primary'>
                            Login
                        </Link>
                        <Link to="/register" className='btn btn-light'>
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Landing
