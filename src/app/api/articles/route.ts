import { NextRequest, NextResponse } from "next/server";
import { articles } from "@/utils/data";

/**
 * @method  GET
 * @route   ~/api/articles
 * @desc    Get All Articles
 * @access  public
 */
export function GET(request: NextRequest) {
    return NextResponse.json(articles, { status: 200 });
}
