# Proyecto Golden Shark

## Acerca de Golden Shark
Golden Shark es una empresa dedicada a ofrecer soluciones tecnológicas innovadoras, proporcionando servicios de desarrollo web y gestión de APIs personalizadas para WordPress.

## Configuración del API en WordPress
Para que el proyecto funcione correctamente, primero debemos crear la API en WordPress. Para ello, es necesario editar el plugin de Astra dentro del archivo `functions.php` y agregar el siguiente código:

```php
/**
 * Añadir roles de usuario a la API REST
 */
add_action('rest_api_init', function () {
    // Endpoint para obtener todos los usuarios
    register_rest_route('custom-api/v1', '/users', [
        'methods' => 'GET',
        'callback' => function () {
            $users = get_users(['number' => -1]);
            $response = [];

            foreach ($users as $user) {
                $response[] = [
                    'id' => $user->ID,
                    'name' => $user->display_name,
                    'email' => $user->user_email,
                    'roles' => $user->roles,
                    'meta' => [
                        'nickname' => get_user_meta($user->ID, 'nickname', true),
                    ],
                ];
            }
            return $response;
        },
        'permission_callback' => function () {
            return current_user_can('list_users');
        },
    ]);

    // Endpoint para obtener un usuario específico por ID
    register_rest_route('custom-api/v1', '/user/(?P<id>\d+)', [
        'methods' => 'GET',
        'callback' => function ($data) {
            $user_id = $data['id'];
            $user = get_userdata($user_id);

            if (!$user) {
                return new WP_Error('user_not_found', 'Usuario no encontrado.', ['status' => 404]);
            }

            return [
                'id' => $user->ID,
                'name' => $user->display_name,
                'email' => $user->user_email,
                'roles' => $user->roles,
                'meta' => [
                    'nickname' => get_user_meta($user->ID, 'nickname', true),
                ],
            ];
        },
        'permission_callback' => function () {
            return current_user_can('list_users');
        },
    ]);
});
```

Para más endpoints y funcionalidades, revisa el código en el archivo `functions.php` dentro del plugin de Astra.

## Tecnologías utilizadas
Este proyecto ha sido desarrollado utilizando:

- **React + Vite** con **JavaScript** para la interfaz de usuario.
- **WordPress REST API** para la gestión de usuarios y roles.

## Autor
Este proyecto ha sido desarrollado por **Bryan Gallegos**.

## Licencia
© 2024 Bryan Gallegos. Todos los derechos reservados.

