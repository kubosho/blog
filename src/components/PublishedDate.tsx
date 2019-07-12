import * as React from 'react';
import { formatYYMMDDString, parseISOFormat } from '../Application/date';

type Props = {
  createdAt: string;
};

export const PublishedDate = (props: Props) => {
  const { createdAt } = props;
  const timeValue = formatYYMMDDString(parseISOFormat(createdAt));
  return <time dateTime={createdAt}>{timeValue}</time>;
};
