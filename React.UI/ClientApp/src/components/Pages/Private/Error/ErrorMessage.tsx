import React, {Component} from 'react';
import {ZodIssue} from "zod";

interface Props {
  errors: Array<ZodIssue>;
  name: string;
}

class ErrorMessage extends Component<Props> {
    render() {
        return (
            <div>
                <small>{this.props.errors.filter(error => error.path.includes(this.props.name)).map(error => <p style={{ color: "red" }}>{error.message}</p>)}</small>
            </div>
        );
    }
}

export default ErrorMessage;