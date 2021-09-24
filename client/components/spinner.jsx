import React from 'react';
import Header from './header';

export default function Spinner(props) {
  return (
    <>
    <Header title='LOADING...'/>
    <div className='center'>
      <div className="lds-ellipsis">
        <div>
        </div>
        <div>
        </div>
        <div>
        </div>
        <div>
        </div>
      </div>
    </div>
    </>
  );
}
