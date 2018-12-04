// # ts in React
import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

// ### JSX
{
  // interface Element extends React.ReactElement<any>
  let jsx: JSX.Element = <div>nihao</div>;

  // wrong
  jsx = null;
  jsx = 2;
  jsx = "2";

  // type ReactText = string | number;
  // type ReactChild = ReactElement<any> | ReactText;
  let jsx2: React.ReactChild = <div>nihao</div>;

  // wrong
  jsx2 = null;
  // ok
  jsx2 = 2;
  jsx2 = "2";

  let node: React.ReactNode;
  // ok
  node = null;
  node = 2;
  node = '2';
  node = false;
  node = true;
  node = <div>nihao</div>;
  node = [];
}

// ### Component

{
  // P, S, SS
  // props, context, updater
  // => props, state

  // interface ComponentClass<P = {}, S = ComponentState> extends StaticLifecycle<P, S> {
  //   new (props: P, context?: any): Component<P, S>;
  //   propTypes?: ValidationMap<P>;
  //   contextType?: Context<any>;
  //   contextTypes?: ValidationMap<any>;
  //   childContextTypes?: ValidationMap<any>;
  //   defaultProps?: Partial<P>;
  //   displayName?: string;
  // }
  type Cp = React.ComponentClass<any>;
  type Cp2 = React.ComponentClass<{}, {}>;

  // interface Component<P = {}, S = {}, SS = any> extends ComponentLifecycle<P, S, SS> { }
  type Cp3 = React.Component<any>;
  type Cp4 = React.Component<{}, {}>;

  // type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;
  // ok
  type Cp5 = React.ComponentType<any>;
  // wrong
  type Cp6 = React.ComponentType<{}, {}>;

  // class PureComponent<P = {}, S = {}, SS = any> extends Component<P, S, SS> { }
  type CpPure = React.PureComponent<{}, {}>;

  // type StatelessComponent<P = {}> = FunctionComponent<P>;
  type CpSFC = React.StatelessComponent<{}>;
  type CpSFC2 = React.SFC<{}>;
  type CpSFC3 = React.FC<{}>;
}

// ### BP ?
{
  // own props: props from parent
  interface IListPageProps {
    age: number
  }

  // own state
  interface IListPageState {
    age: number | null
  }

  // props from connect
  type StateProps = ReturnType<typeof mapStateToProps>;
  // props from dispatch
  type DispatchProps = ReturnType<typeof mapDispatchToProps>;

  // props from router
  type Props = RouteComponentProps<any> &
    StateProps &
    DispatchProps &
    IListPageProps;

  class ListPage extends React.Component<Props, IListPageState> {
    public state: IListPageState;
    constructor(props: Props) {
      super(props);
      this.state = {
        age: props.age || null
      };
    }

    public render() {
      return <div>nihao</div>;
    }
  }

  /* istanbul ignore next */
  const mapStateToProps = function(state: any, ownProps: IListPageProps) {
    return {
      x: 2
    };
  };

  const actions = {
    a: () => undefined
  };

  /* istanbul ignore next */
  const mapDispatchToProps = function(
    dispatch: Dispatch,
    ownProps: IListPageProps
  ) {
    return {
      actions: bindActionCreators({ ...actions }, dispatch)
    };
  };

  const Connected = connect<StateProps, DispatchProps, IListPageProps>(
    mapStateToProps,
    mapDispatchToProps
  )(ListPage);
}
