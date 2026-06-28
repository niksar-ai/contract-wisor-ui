import React from 'react';
import { Container } from 'react-bootstrap';
import '../../styles/app.css';
import Sidebar from './sidebar';
import Header from './header';
import Footer from './footer';

const AppLayout = ({ children }) => {
    return (
        <main className="main">
            <Sidebar />
            <div className="content">
                <Header />
                <Container fluid className="my-3">{children}</Container>
                <Footer />
            </div>
        </main>
    );
};

export default AppLayout;
