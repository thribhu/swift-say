const express = require('express');
const router = express.Router();

class Bookmark {
  constructor(title, owner, createdAt = new Date(), updatedAt = new Date()) {
    this.title = title;
    this.owner = owner;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
