import { FILTERS_BUTTONS } from '../consts';
import { FilterValue } from '../types/todo';


interface Props {
  filterSelected: FilterValue;
  handleChangeFilter: (filter: FilterValue) => void
}

export const Filters: React.FC<Props> = ({
  filterSelected, handleChangeFilter
}) => {
  return (
    <ul className="filters">
      {Object.entries(FILTERS_BUTTONS).map(([key, { literal, href }]) => {
        const isSelected = key === filterSelected;
        const className = isSelected ? "selected" : "";
        return (
          <li key={key}>
            <a
              href={href}
              className={className}
              onClick={(event) => {
                event.preventDefault();
                handleChangeFilter(key as FilterValue)
              }}>
              {literal}
            </a>
          </li>
        );
      })}
    </ul>
  );
};
