# ui-plugin-create-item

Copyright (C) 2017-2019 The Open Library Foundation

This software is distributed under the terms of the Apache License,
Version 2.0. See the file "[LICENSE](LICENSE)" for more information.

## Introduction

This package furnishes a single Stripes plugin of type `create-item`,
which can be included in Stripes modules by means of a `<Pluggable
type="create-item">` element. See [the *Plugins*
section](https://github.com/folio-org/stripes-core/blob/master/doc/dev-guide.md#plugins)
of the Module Developer's Guide.

## Props

| Name | Type | Description | Required |
--- | --- | --- | --- |
| `addItem` | func: (item) => {} | Callback fired when a user clicks Create Item button in Modal and item is created successfully | Yes |
| `instanceId` | string | id of instance record from Inventory in scope of what user want to Create a new item record | Yes |
| `locationId` | string | id of location record from Inventory, which is used to provide a corresponding holding for new item | Yes |
| `disabled` | boolean | Flag to control `disable` property of plugin's button, since it's rendered inside the plugin | No |
| `searchButtonStyle` | string | optional styling of plugin's button | No |
| `searchLabel` | React.node | optional jsx for plugin's button label | No |

This is a [Stripes](https://github.com/folio-org/stripes-core/) UI module for creating item using code of ui-inventory.

## Additional information

See the related [ui-inventory](https://github.com/folio-org/ui-inventory) module. (`ItemForm` is reused)
See the related [ui-orders](https://github.com/folio-org/ui-orders) module. (Consumer)

Other [modules](https://dev.folio.org/source-code/#client-side).

See project [UIOR](https://issues.folio.org/browse/UIOR)
at the [FOLIO issue tracker](https://dev.folio.org/guidelines/issue-tracker).

Other FOLIO Developer documentation is at [dev.folio.org](https://dev.folio.org/)
