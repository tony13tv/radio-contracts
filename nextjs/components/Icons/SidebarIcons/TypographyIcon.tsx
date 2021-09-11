import React from 'react';

class TypographyIcon extends React.Component {

  render() {
    return (
      <svg  className={this.props.className} width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M13.3333 2.66666H2.66667C2.298 2.66666 2 2.96466 2 3.33332V5.33332C2 5.70199 2.298 5.99999 2.66667 5.99999C3.03533 5.99999 3.33333 5.70199 3.33333 5.33332V3.99999H7.33333V12.6667H6C5.63133 12.6667 5.33333 12.9647 5.33333 13.3333C5.33333 13.702 5.63133 14 6 14H10C10.3687 14 10.6667 13.702 10.6667 13.3333C10.6667 12.9647 10.3687 12.6667 10 12.6667H8.66667V3.99999H12.6667V5.33332C12.6667 5.70199 12.9647 5.99999 13.3333 5.99999C13.702 5.99999 14 5.70199 14 5.33332V3.33332C14 2.96466 13.702 2.66666 13.3333 2.66666Z" fill="#231F20"/>
      </svg>
    );
  }
}

export default TypographyIcon;
