import { person } from '@/data/portfolio';
import styles from '../sections/sections.module.css';

/** Footer drawn as a drawing-sheet title block. */
export default function TitleBlock() {
  return (
    <footer className={styles.tbWrap}>
      <div className={styles.titleblock}>
        <div>
          <small>Title</small>
          <span>
            Portfolio of {person.name}, {person.role.toLowerCase()}
          </span>
        </div>
        <div>
          <small>Drawn by</small>
          <span>{person.name}</span>
        </div>
        <div>
          <small>Scale</small>
          <span>NTS</span>
        </div>
        <div>
          <small>Rev</small>
          <span>{new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
