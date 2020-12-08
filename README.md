# WeNotes

## Getting Started

Start the server,

```bash
$ cd ./server
$ npm install
$ npm run start
```

Start the client,

```bash
$ cd ./client
$ npm install
$ npm run start
```

## Features

- 💪 100% Typescript (Umijs + Nestjs)
- ⏱️ Realtime (socket.io)
- 💾 Online (Mysql + Redis)
- 📒 CRUD

## TODO

- [ ] Users Auth
- [ ] Pagination Query
- [ ] Interface Validation
- [ ] Friendly Action Tips (double-check confirmation dialog etc.)
- [ ] Increment Content Saving
- [ ] Multi-User Edition -> [OT](https://operational-transformation.github.io/index.html)

## Table Structure

```Mysql
CREATE TABLE `notes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
```
