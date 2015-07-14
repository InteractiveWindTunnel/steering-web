<?php
namespace KrOs\WFIS\UsersBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use KrOs\WFIS\UsersBundle\Entity\User;

class LoadUserData implements FixtureInterface, ContainerAwareInterface
{

    /**
     * @var ContainerInterface
     */
    private $container;

    /**
     * {@inheritDoc}
     */
    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $userManager = $this->container->get('fos_user.user_manager');
        $user = $userManager->createUser();

        $user->setUsername('username1');
        $user->setEmail('username@domain.at');
        $user->setPlainPassword('alamakota');
        $user->addRole('ROLE_SUPER_ADMIN');
        $user->setEnabled(true);
        $userManager->updateUser($user, true);
    }
}
