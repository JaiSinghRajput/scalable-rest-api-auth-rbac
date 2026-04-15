import { NextFunction, Request, Response } from "express";

const sanitizeValue = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item));
  }

  if (value && typeof value === "object") {
    const input = value as Record<string, unknown>;
    const output: Record<string, unknown> = {};

    for (const [key, nestedValue] of Object.entries(input)) {
      const safeKey = key.replace(/\$/g, "").replace(/\./g, "_");
      output[safeKey] = sanitizeValue(nestedValue);
    }

    return output;
  }

  return value;
};

export const sanitizeRequest = (req: Request, _res: Response, next: NextFunction): void => {
  req.body = sanitizeValue(req.body) as Request["body"];
  req.params = sanitizeValue(req.params) as Request["params"];

  if (req.query && typeof req.query === "object") {
    const sanitizedQuery = sanitizeValue(req.query) as Record<string, unknown>;

    for (const key of Object.keys(req.query)) {
      delete (req.query as Record<string, unknown>)[key];
    }

    Object.assign(req.query as Record<string, unknown>, sanitizedQuery);
  }

  next();
};