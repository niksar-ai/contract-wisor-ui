import React, { useState } from 'react';

const ContactForm = ({ connectFtp }) => {
    // Field names (ftpUser/password) match the backend FtpControllerDTO.
    // Defaults point at the local `sftp` compose service (atmoz/sftp, demo/demo).
    const [ftpDetails, setFtpDetails] = useState({ server: 'sftp', port: 22, ftpUser: 'demo', password: 'demo' });

    return (
        <div className="card mb-3">
            <div className="bg-holder bg-card" style={{ backgroundImage: 'url("/assets/images/card-bg/card-bg-1.png")' }}></div>
            <div className="card-body">
                <div className="row align-items-center">
                    <div className="col-auto"><img src="/assets/images/server.png" alt="" height="80"></img></div>
                    <div className="col">
                        <form className="row">
                            <div className="col-3">
                                <input type="text" className="form-control" id="server" placeholder='Server' value={ftpDetails.server} onChange={e => setFtpDetails({ ...ftpDetails, server: e.target.value })}></input>
                            </div>
                            <div className="col-1">
                                <input type="number" className="form-control" id="port" placeholder='Port' value={ftpDetails.port} onChange={e => setFtpDetails({ ...ftpDetails, port: e.target.value })}></input>
                            </div>
                            <div className="col-3">
                                <input type="text" className="form-control" id="user" placeholder='User' value={ftpDetails.ftpUser} onChange={e => setFtpDetails({ ...ftpDetails, ftpUser: e.target.value })} ></input>
                            </div>
                            <div className="col-3">
                                <input type="password" className="form-control" id="password" placeholder='Password' value={ftpDetails.password} onChange={e => setFtpDetails({ ...ftpDetails, password: e.target.value })}></input>
                            </div>
                            <div className="col-2">
                                <button type="button" className="btn btn-primary" onClick={() => connectFtp(ftpDetails)}><i className="bi bi-hdd-stack mx-2"></i>Connect to FTP</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactForm;