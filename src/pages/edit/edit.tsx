import React from 'react';
import { IRouteComponentProps } from 'umi';
import useSWR from 'swr';
import { getOrCreateNote } from '../../services/notes';
import styles from './styles.less';
import { history } from 'umi';
import { Article, Msg } from 'react-weui';

export default (props: IRouteComponentProps<{ id: string }>) => {
  const { id } = props.match.params;
  const { data, error } = useSWR('/api/note', () => getOrCreateNote(id));
  if (error) {
    return (
      <Msg
        className={styles.msg}
        type="warn"
        title="Something went wrong."
        description={error.message}
      />
    );
  }
  if (!data) {
    return <Msg className={styles.msg} type="loading" title="Loading..." />;
  }
  return (
    <>
      <div className={styles.header}>
        <h3 className={styles.title}>{data.title}</h3>
        <span className={styles.back} onClick={() => history.goBack()}>
          <svg
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1001"
            width="24"
            height="24"
          >
            <path
              d="M399.583232 525.600768c48.83456 47.58528 93.868032 92.75392 140.316672 137.965568 58.200064 56.649728 116.455424 113.242112 174.583808 169.961472 3.084288 3.01056 5.888 6.692864 7.647232 10.590208 3.969024 8.78592 1.56672 15.417344-1.875968 19.433472-3.457024 4.032512-17.983488 5.472256-26.527744-1.247232-29.415424-28.9792-59.392-57.643008-88.979456-86.444032-75.067392-73.080832-150.163456-146.130944-225.153024-219.285504-4.80256-4.685824-9.070592-9.998336-13.113344-15.36-8.27392-10.973184-7.227392-21.342208 1.083392-31.553536 4.284416-5.26336 9.283584-9.94304 14.112768-14.731264 99.833856-99.00032 199.653376-198.012928 299.677696-296.824832 3.182592-3.14368 7.073792-6.447104 11.462656-7.661568 4.757504-1.316864 9.965568-0.012288 13.871104 2.912256 1.03424 0.774144 1.974272 1.665024 2.830336 2.63168 0.700416 0.78848 1.91488 1.910784 2.287616 2.902016 2.123776 5.65248 2.62144 8.00768 0.724992 14.53056-0.927744 3.196928-7.913472 11.098112-10.573824 13.735936a536050.284544 536050.284544 0 0 1-291.002368 288.124928c-4.139008 3.534848-7.020544 6.191104-11.372544 10.319872z"
              fill=""
              p-id="1002"
            ></path>
          </svg>
        </span>
      </div>
      <Article className={styles.art}>{data?.content}</Article>
    </>
  );
};
