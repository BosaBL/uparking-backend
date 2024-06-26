import React, { CSSProperties, Fragment, ReactNode } from 'react';
import zxcvbn from 'zxcvbn';

// components

interface PasswordStrengthBarItemProps {
  score: number;
  itemNum: number;
  barColors: string[];
}

const itemStyle: CSSProperties = {
  flexBasis: 0,
  flexGrow: 1,
  position: 'relative',
  maxWidth: '100%',
  width: '100%',
  height: 4,
};

function Item({ score, itemNum, barColors }: PasswordStrengthBarItemProps) {
  let bgColor = barColors[0];
  if (score >= itemNum) {
    bgColor = barColors[score];
  }

  return (
    <div
      style={{
        ...itemStyle,
        backgroundColor: bgColor,
      }}
    />
  );
}

export interface PasswordFeedback {
  warning?: string;
  suggestions?: string[];
}

interface PasswordStrengthBarState {
  score: number;
}

export interface PasswordStrengthBarProps {
  className?: string;
  style?: CSSProperties;
  scoreWordClassName?: string;
  scoreWordStyle?: CSSProperties;
  password?: string;
  userInputs?: string[];
  barColors?: string[];
  scoreWords?: ReactNode[];
  minLength?: number;
  shortScoreWord?: ReactNode;
  onChangeScore?: (
    score: PasswordStrengthBarState['score'],
    feedback: PasswordFeedback
  ) => void;
}

const rootStyle: CSSProperties = {
  position: 'relative',
};

const wrapStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  margin: '5px 0 0',
};

const spaceStyle: CSSProperties = {
  width: 4,
};

const descStyle: CSSProperties = {
  margin: '5px 0 0',
  color: '#898792',
  fontSize: '1em',
  textAlign: 'right',
};

class PasswordStrengthBar extends React.Component<
  PasswordStrengthBarProps,
  PasswordStrengthBarState
> {
  // eslint-disable-next-line react/static-property-placement
  static defaultProps: PasswordStrengthBarProps = {
    className: undefined,
    style: undefined,
    scoreWordClassName: undefined,
    scoreWordStyle: undefined,
    password: '',
    userInputs: [],
    barColors: ['#ddd', '#ef4836', '#f6b44d', '#2b90ef', '#25c281'],
    scoreWords: ['weak', 'weak', 'okay', 'good', 'strong'],
    minLength: 4,
    shortScoreWord: 'too short',
    onChangeScore: undefined,
  };

  constructor(props: PasswordStrengthBarProps) {
    super(props);
    this.state = { score: 0 };
  }

  public componentDidMount(): void {
    this.setScore();
  }

  public componentDidUpdate(prevProps: PasswordStrengthBarProps): void {
    const { password } = this.props;
    if (prevProps.password !== password) {
      this.setScore();
    }
  }

  private setScore = (): void => {
    const { password, minLength, userInputs, onChangeScore } = this.props;
    let result = null;
    let score = 0;
    let feedback: PasswordFeedback = {};
    if (password && minLength && password.length >= minLength) {
      result = zxcvbn(password, userInputs);
      ({ score, feedback } = result);
    }
    this.setState(
      {
        score,
      },
      () => {
        if (onChangeScore) {
          onChangeScore(score, feedback);
        }
      }
    );
  };

  public render(): ReactNode {
    const {
      className,
      style,
      scoreWordClassName,
      scoreWordStyle,
      password,
      barColors,
      scoreWords,
      minLength,
      shortScoreWord,
    } = this.props;
    const { score } = this.state;
    const pass = password as string;
    const min = minLength as number;
    const sWords = scoreWords as ReactNode[];
    const newShortScoreWord =
      pass.length >= min ? sWords[score] : shortScoreWord;

    return (
      <div className={className} style={{ ...rootStyle, ...style }}>
        <div style={wrapStyle}>
          {[1, 2, 3, 4].map((el: number) => (
            <Fragment key={`password-strength-bar-item-${el}`}>
              {el > 1 && <div style={spaceStyle} />}
              <Item score={score} itemNum={el} barColors={barColors ?? []} />
            </Fragment>
          ))}
        </div>
        <p
          className={scoreWordClassName}
          style={{ ...descStyle, ...scoreWordStyle }}
        >
          {newShortScoreWord}
        </p>
      </div>
    );
  }
}

export default PasswordStrengthBar;
