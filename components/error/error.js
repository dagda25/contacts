import { useState } from 'react';
import classes from './error.module.css';

const Error = ({ text }) => {
  return <div className={classes.error}>{text}</div>;
};
export default Error;
