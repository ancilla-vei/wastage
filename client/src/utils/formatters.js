import dayjs from 'dayjs';export const date=d=>dayjs(d).format('DD MMM YYYY, h:mm A');export const pct=n=>`${Math.round((n||0)*100)}%`;
