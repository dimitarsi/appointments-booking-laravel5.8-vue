<template>
    <div>
        <div class="sidebar-item">
            <a href="#menu" title="Настройки">
                <i class="fa fa-bars"></i>
            </a>
        </div>

        <slot name="sidebar"></slot>

        <slot name="logout"></slot>
    </div>
</template>
