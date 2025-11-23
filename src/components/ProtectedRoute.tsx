"use client";

import React from "react";

/**
 * ProtectedRoute مؤقتًا بدون تحقق من تسجيل الدخول
 * سيظهر أي محتوى داخل الأطفال مباشرة بدون إعادة التوجيه
 */
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
