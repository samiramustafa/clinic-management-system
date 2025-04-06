import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom'; // Using v5 components

// هذا المكون يقبل نفس props التي يقبلها <Route> بالإضافة إلى children
function AdminProtectedRoute({ children, ...rest }) {
    // التحقق من وجود التوكن وعلامة الأدمن في localStorage
    const token = localStorage.getItem('access_token');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    let location = useLocation(); // للحصول على الموقع الحالي

    return (
        <Route
            {...rest} // تمرير props مثل path, exact, etc.
            render={({ location }) => // location هنا لتمريرها للـ Redirect
                token && isAdmin ? (
                    // إذا كان المستخدم أدمن مسجل دخوله، اعرض المكون المحمي (children)
                    children
                ) : (
                    // إذا لم يكن كذلك، أعد التوجيه لصفحة تسجيل دخول الأدمن
                    <Redirect
                        to={{
                            pathname: "/admin/login", // مسار صفحة تسجيل الدخول
                            state: { from: location } // حفظ المسار الأصلي الذي كان يحاول الوصول إليه
                        }}
                    />
                )
            }
        />
    );
}

export default AdminProtectedRoute;