import React from 'react';

class HomeIcon extends React.Component<{className: string}> {

  render() {
    return (
      <svg className={this.props.className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.10465 13.8476V11.8031C6.10464 11.2831 6.52858 10.8605 7.05385 10.857H8.9779C9.50567 10.857 9.93351 11.2806 9.93351 11.8031V11.8031V13.8539C9.93338 14.2954 10.2893 14.6563 10.7352 14.6666H12.0179C13.2966 14.6666 14.3332 13.6404 14.3332 12.3745V12.3745V6.55854C14.3263 6.06053 14.0902 5.59288 13.6918 5.28867L9.30498 1.79018C8.53646 1.18102 7.44397 1.18102 6.67545 1.79018L2.30785 5.29502C1.90801 5.59799 1.67143 6.06642 1.6665 6.56489V12.3745C1.6665 13.6404 2.70309 14.6666 3.98178 14.6666H5.26448C5.72141 14.6666 6.09182 14.2999 6.09182 13.8476V13.8476" stroke="#16365F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
}

export default HomeIcon;
