import { Filter } from '@mikro-orm/core';

// credit to https://wanago.io/2022/06/13/api-nestjs-soft-deletes-mikroorm-filters/ for a great example

interface SoftDeleteFilterArguments {
  includeDeleted?: boolean;
  getOnlyDeleted?: boolean;
}

export const WithSoftDelete = (): ClassDecorator => {
  return Filter({
    name: 'softDelete',
    cond: ({ includeDeleted, getOnlyDeleted }: SoftDeleteFilterArguments) => {
      if (includeDeleted) {
        return {};
      }
      if (getOnlyDeleted) {
        return { deletedAt: { $ne: null } };
      }
      return {
        deletedAt: null,
      };
    },
    default: true,
  });
};
