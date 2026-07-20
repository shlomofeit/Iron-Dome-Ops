import express from "express";

export async function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;
  return res.status(statusCode).json({ message: error.message });
}

export async function logger(req, res, next) {
  console.log(`${req.url} - ${req.method}`);
  next();
}
