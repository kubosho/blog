import * as React from 'react';
import { formatYYMMDDString, formatISOString } from '../Application/date';

type Props = {
  createdAt: number;
};

export const PublishedDate = (props: Props) => {
  const { createdAt } = props;
  const dateTime = formatISOString(createdAt);
  const timeValue = formatYYMMDDString(createdAt);

  const e = <time dateTime={dateTime}>{timeValue}</time>;

  return e;
};
