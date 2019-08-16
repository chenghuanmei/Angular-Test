import * as _ from "lodash";

export function filter<T>(
  items: T[],
  filters: object,
  exactMatch: string[] | boolean = false
): T[] {
  _.forEach(filters, (filterValue: any, key: any) => {
    if (!filterValue) {
      delete filters[key];
    }
  });

  if (_.isEmpty(filters)) {
    return [...items];
  }

  let collection = _(items);

  _.forEach(filters, (filterValue: any, filterProp: any) => {
    if (filterValue === "*") {
      return;
    }

    if (exactMatch === true || _.includes(<any[]>exactMatch, filterProp)) {
      collection = collection.filter(item => {
        const value = _.get(item, filterProp, "") + "";

        return value === filterValue;
      });
    } else {
      filterValue = _.trim(filterValue);

      if (_.isEmpty(filterValue)) {
        return;
      }

      collection = collection.filter(item => {
        const value = _.get(item, filterProp, "") + "";

        return _.includes(value.toLowerCase(), filterValue.toLowerCase());
      });
    }
  });

  return collection.value();
}
