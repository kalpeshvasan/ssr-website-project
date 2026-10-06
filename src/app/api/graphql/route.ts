import { NextRequest, NextResponse } from "next/server";
import { graphql } from "graphql";
import { schema } from "@/lib/graphql/schema";

export async function POST(req: NextRequest) {
  const startTime = performance.now();
  try {
    const body = await req.json();
    const { query, variables, operationName } = body;

    if (!query) {
      return NextResponse.json(
        { errors: [{ message: "Must provide query string in request body." }] },
        { status: 400 }
      );
    }

    const result = await graphql({
      schema,
      source: query,
      variableValues: variables,
      operationName,
    });

    const duration = (performance.now() - startTime).toFixed(2);

    return NextResponse.json(result, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "X-GraphQL-Execution-Time": `${duration}ms`,
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "GraphQL execution failed.";
    return NextResponse.json(
      { errors: [{ message }] },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const variablesStr = searchParams.get("variables");

  if (!query) {
    return NextResponse.json(
      {
        message: "GraphQL Route Handler is active. Send POST requests with { query, variables } or GET with ?query=...",
        endpoint: "/api/graphql",
        status: "OPERATIONAL",
      },
      { status: 200 }
    );
  }

  let variables = undefined;
  if (variablesStr) {
    try {
      variables = JSON.parse(variablesStr);
    } catch {
      // ignore JSON parse error
    }
  }

  const startTime = performance.now();
  const result = await graphql({
    schema,
    source: query,
    variableValues: variables,
  });
  const duration = (performance.now() - startTime).toFixed(2);

  return NextResponse.json(result, {
    headers: {
      "X-GraphQL-Execution-Time": `${duration}ms`,
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
