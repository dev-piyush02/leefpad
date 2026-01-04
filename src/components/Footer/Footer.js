import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Leefpad. All rights reserved.</p>
                <div className="footer-links">
                    <span>Terms</span>
                    <span>Privacy</span>
                    <span>Contact</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
